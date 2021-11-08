export const searchInDB = async (query: any = "", db = "" ) => {
  
  const dbPath = {
    li: "./db/libraries.json",
    so: "./db/sociology.json",
    hs: "./db/history.json",
    co: "./db/communication.json",
    th: "./db/thakafa.json"
  }[db]
  if (dbPath == null) {
    return {
      errorCode: 404,
    }
  }
  const db_ = JSON.parse(await Deno.readTextFile(dbPath));
  const searchResult = db_.filter((book: any) =>
    book.title?.search(query) > 0 || book.author?.search(query)  > 0 || book.ID?.startsWith(query) 
    );
    return searchResult.length>0 ? { sourceCode: 200, searchResult }
    : {
      errorCode: 404,
    };
};
