import { Idea } from './types';
export declare function getNetScore(idea: Idea): number;
export declare function sortByScore(ideas: Idea[]): Idea[];
export declare function statusLabel(status: Idea['status']): string;
