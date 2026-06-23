import BuilderLayout from "@/features/template-builder/components/BuilderLayout";
import EmptyBuilderState from "@/features/template-builder/components/EmptyBuilderState";
import { getTemplateBuilderData } from "@/features/template-builder/services/get-template-builder-data";

export default async function TemplateBuilderPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const template = await getTemplateBuilderData(id);

  if (!template) {
    return (
      <EmptyBuilderState
        title="Template not found"
        message="The requested template does not exist or is unavailable."
      />
    );
  }

  return <BuilderLayout template={template} />;
}
