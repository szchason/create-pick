import { green } from 'kolorist';

export const directoryExist = 'The directory already exists and is not empty. Remove existing files and continue?';
export const projectDirExist = (projectDir :string) :string => `Target directory ${green(projectDir.toLowerCase())} is not empty. Remove existing files and continue?`;
