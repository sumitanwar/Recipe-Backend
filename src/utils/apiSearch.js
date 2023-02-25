class ApiSearch {
  constructor(query, queryStr) {
    this.query = query;
    this.queryStr = queryStr;
  }
  Search() {
    const title = this.queryStr.title
      ? { title: { $regex: this.queryStr.title, $options: "i" } }
      : {};
    this.query = this.query.find(title);
    return this;
  }
}
module.exports = ApiSearch;
// query:find()
// queryStr:req.query
