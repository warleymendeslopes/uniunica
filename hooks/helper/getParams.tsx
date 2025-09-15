export type Params1 = {
  modality: string;
  param1: string;
};

export async function getParams1(
  params: Promise<{ modality: string; param1: string }>
): Promise<Params1> {
  return await params;
}
