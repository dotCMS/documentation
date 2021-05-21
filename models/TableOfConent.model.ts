export interface TableContentModel {
    id: string;
    depth: number;
    value: string;
    children: TableContentModel[];
}
