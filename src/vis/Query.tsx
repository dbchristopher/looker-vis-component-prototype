/*
 * The MIT License (MIT)
 *
 * Copyright (c) 2019 Looker Data Sciences, Inc.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

import React, { FC, useEffect, useState, useContext } from "react";
import { Flex, Spinner } from "@looker/components";
import { ExtensionContext } from "@looker/extension-sdk-react";

/*
 * query_for_slug('ncc4g4V83iRVWjKUa7MFkF', 'id') to get id
 * run_query('126', 'json')
 */

interface QueryProps {
  queryId?: number;
  querySlug?: string;
}

const LoadingIndicator = () => (
  <Flex alignItems="center" justifyContent="center">
    <Spinner color="black" />
  </Flex>
);

interface Collection {
  [k: string]: string | number;
}

interface SDKResponse {
  ok: boolean;
  value: Collection[];
}

export const Query: FC<QueryProps> = ({ queryId: queryIdProp, querySlug }) => {
  const [queryId, setQueryId] = useState<number | undefined>(queryIdProp);
  const [queryResult, setQueryResult] = useState<SDKResponse>({
    ok: true,
    value: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const { core40SDK } = useContext(ExtensionContext);

  // get query ID from slug
  useEffect(() => {
    const fetchQueryId = async (slug: string) => {
      setIsLoading(true);
      const result = await core40SDK.query_for_slug(slug, "id");
      setQueryId(((result as unknown) as SDKResponse).value?.id);
      setIsLoading(false);
    };

    if (querySlug) {
      fetchQueryId(querySlug);
    }
  }, [querySlug]);

  // get full query response
  useEffect(() => {
    const fetchQueryResult = async (id: number) => {
      setIsLoading(true);
      const result = await core40SDK.run_query({
        query_id: id,
        result_format: "json",
      });

      // Not sure why result isn't matching the SDKResponse interface
      setQueryResult((result as unknown) as SDKResponse);

      // TODO: handle timeout errors; how do we PREVENT timeout errors?
      setIsLoading(false);
    };

    if (queryId) {
      fetchQueryResult(queryId);
    }
  }, [queryId]);

  return <>{isLoading && <LoadingIndicator />}</>;
};
