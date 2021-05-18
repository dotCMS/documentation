export interface TableContentModel {
    id: string;
    depth: number;
    value: string;
    key: string;
    children: TableContentModel[];
}
