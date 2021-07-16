import { SiteClient } from "datocms-client";

export default async function sendRequest(request, response) {
  if (request.method === "POST") {
    const passFull = "b2931683542394762ceff008b3d1df";
    const client = new SiteClient(passFull);

    const feed = await client.items.create({
      itemType: "967559",
      ...request.body,
    });

    response.json({
      data: feed,
    });
    return;
  }

  response.status(401).json({
    message: "Method denied",
  });
  return;
}
