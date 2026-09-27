import { useEffect, useMemo, useState } from "react";
import { useClient } from "sanity";
import { useIntentLink } from "sanity/router";
import {
  Box,
  Card,
  Flex,
  Grid,
  Stack,
  Text,
  Heading,
  Badge,
  TextInput,
  Select,
  Button,
  Spinner,
} from "@sanity/ui";
import { SearchIcon } from "@sanity/icons/Search";
import { AddIcon } from "@sanity/icons/Add";
import { EyeOpenIcon } from "@sanity/icons/EyeOpen";
import { EditIcon } from "@sanity/icons/Edit";
import { ImageIcon } from "@sanity/icons/Image";
import { urlForImage } from "../image-url";

const API_VERSION = "2024-01-01";

type PostRow = {
  id: string;
  title: string;
  slug: string | null;
  excerpt: string;
  coverImage: unknown;
  publishedAt: string | null;
  updatedAt: string;
  status: "منشور" | "مسودة";
};

type RawDoc = {
  _id: string;
  title: string;
  slug?: { current?: string };
  excerpt?: string;
  coverImage?: unknown;
  publishedAt?: string;
  _updatedAt: string;
};

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("ar-SA", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function PostCard({ post, siteUrl }: { post: PostRow; siteUrl: string }) {
  const editLink = useIntentLink({ intent: "edit", params: { id: post.id, type: "post" } });
  const coverUrl = post.coverImage
    ? urlForImage(post.coverImage as never)?.width(480).height(270).fit("crop").url()
    : null;

  return (
    <Card radius={3} shadow={1} overflow="hidden" style={{ display: "flex", flexDirection: "column" }}>
      <Box style={{ aspectRatio: "16/9", background: "var(--card-muted-bg-color)", position: "relative" }}>
        {coverUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={coverUrl}
            alt=""
            style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
          />
        ) : (
          <Flex align="center" justify="center" style={{ height: "100%" }}>
            <ImageIcon style={{ fontSize: 32, opacity: 0.35 }} />
          </Flex>
        )}
        <Box style={{ position: "absolute", top: 10, insetInlineStart: 10 }}>
          <Badge tone={post.status === "منشور" ? "positive" : "caution"}>{post.status}</Badge>
        </Box>
      </Box>

      <Stack gap={3} padding={3} flex={1}>
        <Text size={1} weight="semibold" textOverflow="ellipsis">
          {post.title || "بدون عنوان"}
        </Text>
        <Text size={1} muted style={{ minHeight: 40 }}>
          {(post.excerpt || "بدون مقتطف").slice(0, 90)}
        </Text>
        <Text size={0} muted>
          {formatDate(post.publishedAt)}
        </Text>

        <Flex gap={2} marginTop={2}>
          <Button as="a" {...editLink} icon={EditIcon} text="تعديل" mode="ghost" style={{ flex: 1 }} />
          {post.status === "منشور" && post.slug && (
            <Button
              as="a"
              href={`${siteUrl}/blog/${post.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              icon={EyeOpenIcon}
              text="معاينة"
              mode="ghost"
              tone="primary"
              style={{ flex: 1 }}
            />
          )}
        </Flex>
      </Stack>
    </Card>
  );
}

export default function PostsGrid() {
  const client = useClient({ apiVersion: API_VERSION });
  const [posts, setPosts] = useState<PostRow[] | null>(null);
  const [siteUrl, setSiteUrl] = useState("");
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "منشور" | "مسودة">("all");

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [rawDocs, settings] = await Promise.all([
        client.fetch<RawDoc[]>(
          `*[_type == "post"] | order(_updatedAt desc){
            _id, title, slug, excerpt, coverImage, publishedAt, _updatedAt
          }`
        ),
        client.fetch<{ siteUrl?: string } | null>(`*[_type == "siteSettings"][0]{siteUrl}`),
      ]);
      if (cancelled) return;

      setSiteUrl(settings?.siteUrl || "https://mizaro.vercel.app");

      const byRealId = new Map<string, PostRow>();
      for (const doc of rawDocs) {
        const isDraft = doc._id.startsWith("drafts.");
        const realId = isDraft ? doc._id.slice("drafts.".length) : doc._id;
        const existing = byRealId.get(realId);
        if (existing && existing.updatedAt >= doc._updatedAt) continue;
        byRealId.set(realId, {
          id: realId,
          title: doc.title,
          slug: doc.slug?.current ?? null,
          excerpt: doc.excerpt ?? "",
          coverImage: doc.coverImage ?? null,
          publishedAt: doc.publishedAt ?? null,
          updatedAt: doc._updatedAt,
          status: isDraft ? "مسودة" : "منشور",
        });
      }

      setPosts(
        Array.from(byRealId.values()).sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
      );
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [client]);

  const filtered = useMemo(() => {
    if (!posts) return null;
    return posts.filter((post) => {
      const matchesStatus = statusFilter === "all" || post.status === statusFilter;
      const matchesSearch =
        !search.trim() || post.title?.toLowerCase().includes(search.trim().toLowerCase());
      return matchesStatus && matchesSearch;
    });
  }, [posts, search, statusFilter]);

  const newPostLink = useIntentLink({ intent: "create", params: { type: "post" } });

  return (
    <Box padding={4} style={{ maxWidth: 1100, margin: "0 auto" }}>
      <Stack gap={4}>
        <Flex align="center" justify="space-between" wrap="wrap" gap={3}>
          <Stack gap={2}>
            <Heading size={2}>مقالات المدونة</Heading>
            <Text size={1} muted>
              {posts ? `${posts.length} مقال` : "جارٍ التحميل…"}
            </Text>
          </Stack>
          <Button as="a" {...newPostLink} icon={AddIcon} text="مقال جديد" tone="primary" />
        </Flex>

        <Flex gap={3} wrap="wrap">
          <Box flex={1} style={{ minWidth: 220 }}>
            <TextInput
              icon={SearchIcon}
              placeholder="ابحث بعنوان المقال…"
              value={search}
              onChange={(e) => setSearch(e.currentTarget.value)}
            />
          </Box>
          <Box style={{ width: 180 }}>
            <Select
              value={statusFilter}
              onChange={(e) =>
                setStatusFilter(e.currentTarget.value as "all" | "منشور" | "مسودة")
              }
            >
              <option value="all">كل الحالات</option>
              <option value="منشور">منشور</option>
              <option value="مسودة">مسودة</option>
            </Select>
          </Box>
        </Flex>

        {filtered === null ? (
          <Flex padding={5} justify="center">
            <Spinner />
          </Flex>
        ) : filtered.length === 0 ? (
          <Card padding={5} radius={3} tone="transparent" border style={{ borderStyle: "dashed" }}>
            <Text align="center" muted>
              {posts && posts.length > 0
                ? "لا توجد مقالات مطابقة للبحث/الفلتر."
                : "ما فيه مقالات بعد — ابدأ بإنشاء أول مقال."}
            </Text>
          </Card>
        ) : (
          <Grid gridTemplateColumns={[1, 2, 3]} gap={3}>
            {filtered.map((post) => (
              <PostCard key={post.id} post={post} siteUrl={siteUrl} />
            ))}
          </Grid>
        )}
      </Stack>
    </Box>
  );
}
