export interface Options {
    file?: File;
    chunkSize?: number
}

/** Text file reader (chunk by chunk, line by line).
 * Large files are read in chunks and returned line by line
 * to handle read progress and prevent memory leaks.
 * @param {Object} options
 *  @param {File} [options.file]
 *  @param {number} [options.chunkSize=1E6]
 */
export default class TextStreamReader {
    constructor(options?: Options);

    /** Set file to read
     * @param {File} file
     */
    setFile(file: File): void;

    /** Sets the file position indicator to the beginning of the file stream.
     */
    rewind(): void;
    /** Set reader chunk size
     * @param {number} [chunkSize=1E6]
     */
    setChunkSize(s: any): void;
    /** Get progress
     * @return {number} progress [0,1]
     */
    getProgress(): number;
    /** Read a text file line by line from the start
     * @param {function} getLine a function that gets the current line as argument. Return false to stop reading
     * @param {function} [progress] a function that gets the progress on each chunk (beetween 0,1) and a boolean set to true on end
     */
    readLines(getLine: (line: string) => void, progress?: (number, boolean) => void): void;
    /** Read a set of line chunk from the stream
     * @param {function} getLines a function that gets lines read as an Array<String>.
     * @param {function} [progress] a function that gets the progress (beetween 0,1) and a boolean set to true on end of file
     */
    readChunk(getLines: (lines: string[]) => void, progress?: (number, boolean) => void): void

}
