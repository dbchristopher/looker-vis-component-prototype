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
import { ExtensionContext } from "@looker/extension-sdk-react";

/*
 * query_for_slug('I2HlRYpd8beuaQySJsUPp7', 'id') to get id
 * run_query('123', 'json')
 */

interface QueryProps {
  queryId?: number;
  querySlug?: string;
}

export const Query: FC<QueryProps> = ({ queryId }) => {
  const [queryResult, setQueryResult] = useState({});
  const { core31SDK } = useContext(ExtensionContext);

  // TODO: get query id if they provide the slug

  useEffect(() => {
    const runQuery = async (id: number) => {
      const results = await core31SDK.run_query({
        query_id: id,
        result_format: "json",
      });
      setQueryResult(results);
    };

    if (queryId) {
      runQuery(queryId);
    }
  }, [queryId]);

  console.log("RESULT", queryResult);

  return <>QUERY</>;
};
