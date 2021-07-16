import { SiteClient } from "datocms-client";
import { tokenFull } from "../../src/services/datocms";

export default async function sendRequest(request, response) {
  if (request.method === "POST") {
    const client = new SiteClient(tokenFull);

    const record = await client.items.create({
      itemType: "966847",
      ...request.body,
    });

    response.json({
      data: record,
    });
    return;
  }

  response.status(401).json({
    message: "Method denied",
  });
  return;
}
