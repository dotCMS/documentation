import { CodeShareTopic } from '@models/CodeShare.model';

interface topics {
    key: string;
}

export const fetchAllCodeShareTopics = async (): Promise<CodeShareTopic[]> => {
    const { esresponse } = await (
        await fetch('https://authoring.dotcms.com/api/es/search', TOPIC_QUERY)
    ).json();
    const data = esresponse[0].aggregations['sterms#tag'].buckets;
    return transformDataIntoCodeShareTopics(data);
};

const transformDataIntoCodeShareTopics = (data: topics[]): CodeShareTopic[] => {
    const codeShareTopics = data.map((topic) => {
        const link = topic.key.replace(/ /g, '-');
        return {
            title: topic.key,
            link
        };
    });
    codeShareTopics.unshift({ title: 'All Codeshare', link: 'all' });
    return codeShareTopics;
};

const TOPIC_QUERY = {
    method: 'POST',
    headers: {
        cookie: 'BACKENDID=192.168.48.3',
        'Content-Type': 'application/json'
    },
    body: `{\"query\":{\"query_string\":{\"query\":\"+contenttype:codeshare\"}},\"aggs\":{\"tag\":{\"terms\":{\"field\":\"tags\",\"size\":20}}},\"size\":0}`
};
