export default app => {
  app.db.sync().done(() =>{
    app.listen(port);
  });
}
