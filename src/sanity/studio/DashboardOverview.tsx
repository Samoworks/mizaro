import { useEffect, useState } from "react";
import { useClient, useSchema } from "sanity";
import { useIntentLink } from "sanity/router";
import {
  Card,
  Flex,
  Grid,
  Box,
  Stack,
  Text,
  Heading,
  Badge,
  Spinner,
  Button,
} from "@sanity/ui";
import { DocumentIcon } from "@sanity/icons/Document";
import { EditIcon } from "@sanity/icons/Edit";
import { EditIcon as DraftIcon } from "@sanity/icons/Edit";
import { CheckmarkCircleIcon } from "@sanity/icons/CheckmarkCircle";
import { HelpCircleIcon } from "@sanity/icons/HelpCircle";
import { CreditCardIcon } from "@sanity/icons/CreditCard";

const API_VERSION = "2024-01-01";

type Counts = {
  publishedPosts: number;
  draftPosts: number;
  faqs: number;
  pricingPlans: number;
};

type RecentPost = {
  id: string;
  title: string;
  status: "منشور" | "مسودة";
  updatedAt: string;
};

function RecentPostRow({ post }: { post: RecentPost }) {
  const linkProps = useIntentLink({
    intent: "edit",
    params: { id: post.id, type: "post" },
  });

  return (
    <Card as="a" {...linkProps} padding={3} radius={2} tone="default" style={{ display: "block" }}>
      <Flex align="center" justify="space-between" gap={3}>
        <Flex align="center" gap={3} style={{ minWidth: 0 }}>
          <Box style={{ color: "var(--card-muted-fg-color)" }}>
            <DocumentIcon />
          </Box>
          <Text size={1} weight="medium" textOverflow="ellipsis">
            {post.title || "بدون عنوان"}
          </Text>
        </Flex>
        <Flex align="center" gap={3} style={{ flexShrink: 0 }}>
          <Badge tone={post.status === "منشور" ? "positive" : "caution"}>
            {post.status}
          </Badge>
          <Text size={0} muted>
            {new Date(post.updatedAt).toLocaleDateString("ar-SA")}
          </Text>
        </Flex>
      </Flex>
    </Card>
  );
}

function StatCard({
  icon,
  label,
  value,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | null;
  tone: "primary" | "positive" | "caution" | "default";
}) {
  return (
    <Card padding={4} radius={3} shadow={1} tone={tone}>
      <Stack gap={3}>
        <Box style={{ opacity: 0.7 }}>{icon}</Box>
        <Heading size={4}>{value === null ? "—" : value}</Heading>
        <Text size={1} muted>
          {label}
        </Text>
      </Stack>
    </Card>
  );
}

export default function DashboardOverview() {
  const client = useClient({ apiVersion: API_VERSION });
  const schema = useSchema();
  const [counts, setCounts] = useState<Counts | null>(null);
  const [recent, setRecent] = useState<RecentPost[] | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const [publishedPosts, draftPosts, faqs, pricingPlans, rawRecent] =
        await Promise.all([
          client.fetch<number>(
            `count(*[_type == "post" && !(_id in path("drafts.**"))])`
          ),
          client.fetch<number>(
            `count(*[_type == "post" && _id in path("drafts.**")])`
          ),
          client.fetch<number>(`count(*[_type == "faq"])`),
          client.fetch<number>(`count(*[_type == "pricingPlan"])`),
          client.fetch<
            Array<{ _id: string; title: string; _updatedAt: string }>
          >(
            `*[_type == "post"] | order(_updatedAt desc)[0...8]{_id, title, _updatedAt}`
          ),
        ]);

      if (cancelled) return;

      setCounts({ publishedPosts, draftPosts, faqs, pricingPlans });

      // ندمج نسخة المسودة والمنشورة لنفس المقال في صف واحد، ونعرض أحدث 5
      const byRealId = new Map<string, RecentPost>();
      for (const doc of rawRecent) {
        const isDraft = doc._id.startsWith("drafts.");
        const realId = isDraft ? doc._id.slice("drafts.".length) : doc._id;
        const existing = byRealId.get(realId);
        if (!existing || doc._updatedAt > existing.updatedAt) {
          byRealId.set(realId, {
            id: realId,
            title: doc.title,
            status: isDraft ? "مسودة" : "منشور",
            updatedAt: doc._updatedAt,
          });
        }
      }
      setRecent(
        Array.from(byRealId.values())
          .sort((a, b) => (a.updatedAt < b.updatedAt ? 1 : -1))
          .slice(0, 5)
      );
    }

    load();
    return () => {
      cancelled = true;
    };
  }, [client]);

  const postsListLink = useIntentLink({ intent: "create", params: { type: "post" } });
  const postsType = schema.get("post");

  return (
    <Box padding={4} style={{ maxWidth: 960, margin: "0 auto" }}>
      <Stack gap={5}>
        <Flex align="center" justify="space-between">
          <Stack gap={2}>
            <Heading size={2}>نظرة عامة</Heading>
            <Text size={1} muted>
              ملخص سريع لمحتوى موقع مِزارو
            </Text>
          </Stack>
          {postsType && (
            <Button as="a" {...postsListLink} text="+ مقال جديد" tone="primary" />
          )}
        </Flex>

        <Grid gridTemplateColumns={[2, 2, 4]} gap={3}>
          <StatCard
            icon={<CheckmarkCircleIcon style={{ fontSize: 24 }} />}
            label="مقالات منشورة"
            value={counts?.publishedPosts ?? null}
            tone="positive"
          />
          <StatCard
            icon={<DraftIcon style={{ fontSize: 24 }} />}
            label="مسودات"
            value={counts?.draftPosts ?? null}
            tone="caution"
          />
          <StatCard
            icon={<HelpCircleIcon style={{ fontSize: 24 }} />}
            label="الأسئلة الشائعة"
            value={counts?.faqs ?? null}
            tone="primary"
          />
          <StatCard
            icon={<CreditCardIcon style={{ fontSize: 24 }} />}
            label="الباقات"
            value={counts?.pricingPlans ?? null}
            tone="default"
          />
        </Grid>

        <Stack gap={3}>
          <Heading size={1}>آخر نشاط في المدونة</Heading>
          {recent === null ? (
            <Flex padding={4} justify="center">
              <Spinner />
            </Flex>
          ) : recent.length === 0 ? (
            <Card padding={4} radius={3} tone="transparent" border style={{ borderStyle: "dashed" }}>
              <Flex align="center" gap={3}>
                <EditIcon />
                <Text size={1} muted>
                  ما فيه مقالات بعد — ابدأ بإنشاء أول مقال.
                </Text>
              </Flex>
            </Card>
          ) : (
            <Stack gap={2}>
              {recent.map((post) => (
                <RecentPostRow key={post.id} post={post} />
              ))}
            </Stack>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
