import { useFormValue } from "sanity";
import { Box, Card, Flex, Stack, Text, Button } from "@sanity/ui";
import { EyeOpenIcon } from "@sanity/icons/EyeOpen";

/**
 * معاينة حقيقية للمقال كما سيظهر على الموقع، داخل إطار (iframe) يحمّل
 * صفحة /blog/<slug> الفعلية. صفحة الموقع لا تعرض إلا المحتوى المنشور فعليًا،
 * فإذا لم يُنشر المقال بعد يظهر داخل الإطار نفس صفحة "غير موجود" التي
 * سيراها الزائر — وهذا هو السلوك الصحيح لمعاينة حقيقية.
 */
export default function PostPreviewPane() {
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  const siteUrl = "https://mizaro.vercel.app";

  if (!slug) {
    return (
      <Flex align="center" justify="center" padding={5} style={{ height: "100%" }}>
        <Card padding={5} radius={3} tone="transparent" border style={{ borderStyle: "dashed", maxWidth: 420 }}>
          <Stack gap={3}>
            <Text align="center" size={2}>
              👀
            </Text>
            <Text align="center" weight="medium">
              حدد رابط (Slug) للمقال أولًا
            </Text>
            <Text align="center" size={1} muted>
              بمجرد إضافة عنوان المقال يتولد الرابط تلقائيًا، وتظهر هنا معاينة
              حقيقية للمقال كما سيبدو على الموقع بعد نشره.
            </Text>
          </Stack>
        </Card>
      </Flex>
    );
  }

  const url = `${siteUrl}/blog/${slug}`;

  return (
    <Stack gap={0} style={{ height: "100%" }}>
      <Card padding={2} borderBottom>
        <Flex align="center" justify="space-between">
          <Text size={1} muted>
            {url}
          </Text>
          <Button
            as="a"
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            icon={EyeOpenIcon}
            text="فتح في تبويب جديد"
            mode="ghost"
            fontSize={1}
          />
        </Flex>
      </Card>
      <Box flex={1} style={{ minHeight: "70vh" }}>
        <iframe
          src={url}
          title="معاينة المقال"
          style={{ width: "100%", height: "100%", border: "none" }}
        />
      </Box>
    </Stack>
  );
}
