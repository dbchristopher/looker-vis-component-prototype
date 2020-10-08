import React, { FC } from "react";
import { Page } from "./Page";
import { Query, Visualization } from "../vis";
import { Heading, Card, CardContent, Space } from "@looker/components";

export const QueryDemo: FC = () => {
  return (
    <Page>
      <Space>
        <Card>
          <CardContent>
            <Heading>Query from ID:</Heading>
            <Query queryId={126}>
              <Visualization debug />
            </Query>
          </CardContent>
        </Card>
        <Card>
          <CardContent>
            <Heading>Query From Slug:</Heading>
            <Query querySlug="ncc4g4V83iRVWjKUa7MFkF">
              <Visualization debug />
            </Query>
          </CardContent>
        </Card>
      </Space>
    </Page>
  );
};
