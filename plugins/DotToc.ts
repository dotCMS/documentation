import visit from 'unist-util-visit';
import { Node } from 'unist';

export let toc: NodeTableContent[] = [];

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
        toc = [];
        visit(node, 'heading', (node: CustomNode) => {
            const data = node.data || null;
            const props = data ? data.hProperties : null;
            const value = buildHeading(node.children);
            const newNode: NodeTableContent = {
                depth: node.depth,
                value: value,
                id: props ? props.id : '',
                key: value.replace(' ', '-')
            };
            toc.push(newNode);
        });
    };
}

const buildHeading = (children: CustomNode[]): string => {
    const value = children.map((node) => {
        if (node.children) {
            return buildHeading(node.children);
        }
        return node.type === 'text' ? node.value : '';
    });
    return value.join('');
};
