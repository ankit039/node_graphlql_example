let usertab = [
    [1,"a@gmail.com","$2b$10$JGOti0UsZNbQ3aU/jxiWyexVZizMHd/9u6roDrB7VtvMGg6wjdX2a"],
    [2,"b@gmail.com","$2b$08$FCW2HBxgTLBPcfyINNhnpuc6XEC9cd3PH3fKc11NyjMaeoXq6iloO"],
    [3,"c@gmail.com","$2b$10$G9BTtYyGddrV2HQAxxDX7OUaLA9Dvq0XEEaS5LxAMe.iLFc2N8nJy"],
    [4,"d@gmail.com","$2b$05$TvVuF1Mc41OwHgR6FhxRxOtWvxqhLmktoX42OSuxcnah1WzkUf.YG"],
    [5,"e@gmail.com","$2b$09$dhPc4kwMfAUNnR297XV6/OBCh5ERgv0Fax/SW8QIz6zGW8JWVijJq"],
    [6,"f@gmail.com","$2b$08$PFWN8whUpp7G/1.D/l/HQ.N.XpX9zhJ5PzNxwzlPvJK6rmxvSjd0S"],
    [7,"g@gmail.com","$2b$05$cVZJmZHyP7AxKU3Iuw.WC.XtI04O58U7uKkPRX1pFfcB3gJ0v5JEW"],
    [8,"h@gmail.com","$2b$07$kiTlfxHFagkwHwyT5uljveEvlvQYMZohcwCvvKAZ/fqv.H1e5lIjO"],
    [9,"i@gmail.com","$2b$08$R1V8IwrZmtSL3DxUYnu1.e4MSOk3d/sW/LF9Gl5d29BALwMkCbsOa"],
    [10,"j@gmail.com","$2b$09$X1A04PcXWe8P5gkEI3j55u380USy5vu1dnDo2/0evrJZdwFvST/yC"],
    [11,"k@gmail.com","$2b$09$9PL5EDkZeenFpSGxN.2WWeR2gp4ZEJJIPIKnG1k4sc57IsabiF.dC"],
    [12,"l@gmail.com","$2b$08$33Y/FUCTbuqTyAdwL5vaIOau1hEMTKRG6RE2mMU0eaB3cS73m1p4K"]
  ];
  
  let employeetab = [
      [1,"a@gmail.com","a1","a","r","test-a"],
      [2,"b@gmail.com","b1","b","r","test-b"],
      [3,"c@gmail.com","c1","c","r","test-c"],
      [4,"d@gmail.com","d1","d","r","test-d"],
      [5,"e@gmail.com","e1","e","r","test-e"],
      [6,"f@gmail.com","f1","f","r","test-f"],
      [7,"g@gmail.com","g1","g","r","test-g"],
      [8,"h@gmail.com","h1","h","r","test-h"],
      [9,"i@gmail.com","i1","i","r","test-i"],
      [10,"j@gmail.com","j1","j","r","test-j"],
      [11,"k@gmail.com","k1","k","r","test-b"],
      [12,"l@gmail.com","l1","l","r","test-a"]
    ];
  
  let q1 =
    "insert into user (id, emailID, password) " +
    "VALUES (?, ?, ?)";
  let q2 =
    "insert into employee (id, emailID, employeeID, firstName, lastName, orgName) " +
    "VALUES (?, ?, ? ,? ,? ,?)";
  
  let s1 = database.prepare(q1);
  let s2 = database.prepare(q2);
  
  for (var i = 0; i < usertab.length; i++) {
    s1.run(usertab[i], function (err) {
      if (err) throw err;
    });
  }
  
  for (var i = 0; i < employeetab.length; i++) {
      s2.run(employeetab[i], function (err) {
        if (err) throw err;
      });
    }
  
  s1.finalize();
  
  s2.finalize();