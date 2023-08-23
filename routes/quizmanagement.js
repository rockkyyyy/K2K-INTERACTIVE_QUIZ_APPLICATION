const express = require("express");
const router = express.Router();
const mysql = require("../connection").con;


router.get("/index", (req, res)=>{
    res.render("index");
    });
    
    router.get("/add", (req, res) => {
        res.render("add")
    
    });
    router.get("/search", (req, res) => {
        res.render("search")
    
    });
    router.get("/update", (req, res) => {
        res.render("update")
    
    });
    
    router.get("/delete", (req, res) => {
        res.render("delete")
    
    });
    
    router.get("/view", (req, res) => {
        let qry = "select * from quiz ";
        mysql.query(qry, (err, results) => {
            if (err) throw err
            else {
                res.render("view", { data: results });
            }
    
        });
    
    });
    
    router.get("/addquiz", (req, res) => {
        // fetching data from form
        const { name, Description, quizid, level } = req.query
    
        // Sanitization XSS...
        let qry = "select * from quiz where quiz_id=? or quiz_name=?";
        mysql.query(qry, [quizid, name], (err, results) => {
            if (err)
                throw err
            else {
    
                if (results.length > 0) {
                    res.render("add", { checkmesg: true })
                } else {
    
                    // insert query
                    let qry2 = "insert into quiz values(?,?,?,?)";
                    mysql.query(qry2, [name, Description, quizid, level], (err, results) => {
                        if (results.affectedRows > 0) {
                            res.render("add", { mesg: true })
                        }
                        else{
                            res.render("add", { errmesg: true })
                        }
                    })
                }
            }
        })
    });
    
    router.get("/searchquiz", (req, res) => {
        // fetch data from the form
    
    
        const { quizid } = req.query;
    
        let qry = "select * from quiz where quiz_id=?";
        mysql.query(qry, [quizid], (err, results) => {
            if (err) throw err
            else {
                if (results.length > 0) {
                    res.render("search", { mesg1: true, mesg2: false })
                } else {
    
                    res.render("search", { mesg1: false, mesg2: true })
    
                }
    
            }
        });
    })
    
    
    
    router.get("/updatesearch", (req, res) => {
    
        const { quizid } = req.query;
    
        let qry = "select * from quiz where quiz_id=?";
        mysql.query(qry, [quizid], (err, results) => {
            if (err) throw err
            else {
                if (results.length > 0) {
                    res.render("update", { mesg1: true, mesg2: false, data: results })
                } else {
    
                    res.render("update", { mesg1: false, mesg2: true })
    
                }
    
            }
        });
    })
    router.get("/updatequiz", (req, res) => {
        // fetch data
    
        const {Description, quizid, name, level } = req.query;
        let qry = "update quiz set quiz_name=?, level=? , quiz_desc=? where quiz_id=?";
    
        mysql.query(qry, [name, level,Description, quizid], (err, results) => {
            if (err) throw err
            else {
                if (results.affectedRows > 0) {
                    res.render("update", { umesg: true })
                }
            }
        })
    
    });
    
    router.get("/removequiz", (req, res) => {
    
        // fetch data from the form
    
    
        const { quizid } = req.query;
    
        let qry = "delete from quiz where quiz_id=?";
        mysql.query(qry, [quizid], (err, results) => {
            if (err) res.render("delete", { mesg3: true, mesg2: false, mesg1 :false })
            else {
                if (results.affectedRows > 0) {
                    res.render("delete", { mesg1: true, mesg2: false , mesg3 :false })
                } else {
    
                    res.render("delete", { mesg1: false, mesg2: true , mesg3 :false  })
    
                }
    
            }
        });
    });

      router.get("/addtf", (req, res) => {
        res.render("addtf")
      });
    router.get("/addquestions", (req, res) => {
        // fetching data from form
        const {  Qname,op1,iscorrect1,op2,iscorrect2,quizid } = req.query
         // Sanitization XSS...
        let qry = "select * from true_or_false where  question=?";
        mysql.query(qry, [Qname], (err, results) => {
            if (err)
                throw err
            else {
    
                if (results.length > 0) {
                    res.render("addtf", { checkmesg: true })
                } else {
    
                    // insert query
                    let qry2 = "insert into true_or_false values(?,?,?,?,?,?)";
                    mysql.query(qry2, [ Qname, op1,iscorrect1,op2,iscorrect2,quizid], (err, results) => {
                        if (results && results.affectedRows > 0) {
                            res.render("addtf", { mesg: true });
                        } else {
                            // Handle the case where no rows were affected
                            res.render("addtf", { errmesg: true });
                        }
                       
                    })
                }
            }
        })
    });
    
       
    
    
    router.get("/deletetf", (req, res) => {
        res.render("deletetf")
    
    });
    
    
    router.get("/removetf", (req, res) => {
    
        // fetch data from the form
        const { Qname } = req.query;
    
        let qry = "delete from true_or_false where question=?";
        mysql.query(qry, [Qname], (err, results) => {
            if (err) res.render("deletetf", { mesg3: true, mesg2: false, mesg1 :false })
            else {
                if (results.affectedRows > 0) {
                    res.render("deletetf", { mesg1: true, mesg2: false , mesg3 :false})
                } else {
    
                    res.render("deletetf", { mesg1: false, mesg2: true , mesg3 :false})
                }
            }
        });
    });
    
    
    router.get("/viewquestion", (req, res) => {
        let qry = "select * from true_or_false ";
        mysql.query(qry, (err, results) => {
            if (err) throw err
            else {
                res.render("viewquestion", { data: results });
            }
    
        });
    
    });
    //////////
    
    router.get("/addmcq", (req, res) => {
        res.render("addmcq")
    
    });
    router.get("/addquestionss", (req, res) => {
        // fetching data from form
        const {  Qname,op1,iscorrect1,op2,iscorrect2,op3,iscorrect3,op4,iscorrect4,quizid } = req.query
         // Sanitization XSS...
        let qry = "select * from mcqs where  question=?";
        mysql.query(qry, [Qname], (err, results) => {
            if (err)
                throw err
            else {
    
                if (results.length > 0) {
                    res.render("addmcq", { checkmesg: true })
                } else {
    
                    // insert query
                    let qry2 = "insert into mcqs values(?,?,?,?,?,?,?,?,?,?)";
                    mysql.query(qry2, [ Qname, op1,iscorrect1,op2,iscorrect2,op3,iscorrect3,op4,iscorrect4,quizid], (err, results) => {
                        if (results && results.affectedRows > 0) {
                            res.render("addmcq", { mesg: true });
                        } else {
                            // Handle the case where no rows were affected
                            res.render("addmcq", { errmesg: true });
                        }
                       
                    })
                }
            }
        })
    });

    
    
    router.get("/deletemcq", (req, res) => {
        res.render("deletemcq")
    
    });
    
    router.get("/removemcqs", (req, res) => {
    
        // fetch data from the form
        const { Qname} = req.query;
    
        let qry = "delete from mcqs where question=?";
        mysql.query(qry, [Qname], (err, results) => {
            if (err) throw err
            else {
                 if (results && results.affectedRows > 0) {
                            res.render("deletemcq", { mesg1: true });
                        } else {
                            // Handle the case where no rows were affected
                            res.render("deletemcq", { mesg2: true });
                        }
            }
        });
    });
    
    
    router.get("/viewmcq", (req, res) => {
        let qry = "select * from mcqs ";
        mysql.query(qry, (err, results) => {
            if (err) throw err
            else {
                res.render("viewmcq", { data: results });
            }
    
        });
    
    });

    router.get("/viewresults", (req, res) => {
        let qry = "select * from results ";
        mysql.query(qry, (err, results) => {
            if (err) throw err
            else {
                res.render("viewresults", { data: results });
            }
    
        });
    
    });



    module.exports = router;