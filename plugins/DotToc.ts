import visit from 'unist-util-visit';
import { Node } from 'unist';

export let tableOfContent: NodeTableContent[] = [];

interface CustomNode extends Node {
    value: string;
    depth: number;
    children?: CustomNode[];
    data: { hProperties: { id: string }; id: string };
}

interface NodeTableContent {
    value: string;
    depth: number;
    id: string;
    key: string;
}

export default function () {
    return function (node: CustomNode): void {
        tableOfContent = [];
        visit(node, 'heading', (node: CustomNode) => {
            const data = node.data || null;
            const props = data ? data.hProperties : null;
            const value = node.children[0].value;
            const newNode: NodeTableContent = {
                depth: node.depth,
                value: value,
                id: props ? props.id : '',
                key: value.replace(' ', '-')
            };
            tableOfContent.push(newNode);
        });
    };
}
