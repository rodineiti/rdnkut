import React from "react";
import moment from "moment";
import { Box, Card } from "../../components/Home";

export default function Posts({ data = [] }) {
  return (
    <div>
      {data.length > 0 &&
        data.map((item) => (
          <Box key={item.id}>
            <Card>
              <img
                src={`https://github.com/${item.username}.png`}
                alt={item.username}
              />
              <div>
                <span>{item.username}</span>{" "}
                <i>{moment(item.createdAt).format("DD/MM/YYYY HH:mm:ss")}</i>
                <p>{item.title}</p>
              </div>
            </Card>
          </Box>
        ))}
    </div>
  );
}
