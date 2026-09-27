import { useFormValue, type StringInputProps, type TextInputProps } from "sanity";
import { Box, Card, Stack, Text, Flex } from "@sanity/ui";

/** عداد أحرف بسيط يوضع تحت أي حقل نص، مع لون تحذيري إذا تجاوز الحد المقترح */
function CharCounter({ value, max }: { value: string; max: number }) {
  const length = value?.length ?? 0;
  const over = length > max;
  return (
    <Flex justify="flex-end">
      <Text size={0} style={{ color: over ? "var(--card-critical-fg-color)" : "var(--card-muted-fg-color)" }}>
        {length} / {max} حرف
      </Text>
    </Flex>
  );
}

/** حقل عنوان المقال + عداد أحرف (يُستخدم أيضًا كعنوان meta title) */
export function TitleInputWithCounter(props: StringInputProps) {
  return (
    <Stack gap={2}>
      {props.renderDefault(props)}
      <CharCounter value={props.value ?? ""} max={60} />
    </Stack>
  );
}

/** حقل وصف SEO + عداد أحرف + معاينة حية لنتيجة بحث Google */
export function SeoDescriptionInputWithPreview(props: TextInputProps) {
  const title = useFormValue(["title"]) as string | undefined;
  const slug = useFormValue(["slug", "current"]) as string | undefined;
  const excerpt = useFormValue(["excerpt"]) as string | undefined;
  const siteUrl = "mizaro.vercel.app";

  const description = props.value || excerpt || "";

  return (
    <Stack gap={3}>
      {props.renderDefault(props)}
      <CharCounter value={props.value ?? ""} max={160} />

      <Box>
        <Text size={1} weight="medium" muted>
          معاينة نتيجة البحث في Google
        </Text>
        <Card padding={3} radius={2} marginTop={2} tone="transparent" border style={{ direction: "ltr" }}>
          <Stack gap={1}>
            <Text size={1} style={{ color: "#1a0dab" }}>
              {title || "عنوان المقال"}
            </Text>
            <Text size={0} style={{ color: "#006621" }}>
              {siteUrl} › blog › {slug || "رابط-المقال"}
            </Text>
            <Text size={1} style={{ color: "#545454" }}>
              {(description || "سيظهر هنا وصف المقال...").slice(0, 160)}
            </Text>
          </Stack>
        </Card>
      </Box>
    </Stack>
  );
}
