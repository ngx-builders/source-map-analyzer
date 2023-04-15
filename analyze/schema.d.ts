export interface Schema {
    outputPath: string;
    gzip?: boolean;
    reportPath?: string;
    reportFormat: 'html' | 'json'  | 'tsv'  ;
}