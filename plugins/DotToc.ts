import visit from 'unist-util-visit';
import { Node } from 'unist';
import { TableContentModel } from '@models/TableOfConent.model';

export let toc: TableContentModel[] = [];

interface CustomNode extends Node {
    value: string;
    depth: number;
    children?: CustomNode[];
    data: { hProperties: { id: string }; id: string };
}

export default function () {
    return function (node: CustomNode): void {
        toc = [];
        visit(node, 'heading', (node: CustomNode) => {
            if (node.depth == 2 || node.depth == 3) {
                const data = node.data || null;
                const props = data ? data.hProperties : null;
                const value = buildHeading(node.children);
                const newNode: TableContentModel = {
                    depth: node.depth,
                    value: value,
                    id: props ? props.id : '',
                    key: value.replace(' ', '-'),
                    children: []
                };
                toc = buildThree(toc, newNode);
            }
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

const buildThree = (toc: TableContentModel[], newNode: TableContentModel): TableContentModel[] => {
    const lastIndex = toc.length - 1;
    if (lastIndex >= 0 && toc[lastIndex].depth < newNode.depth) {
        toc[lastIndex].children = buildThree(toc[lastIndex].children, newNode);
    } else {
        toc.push(newNode);
    }
    return toc;
};
