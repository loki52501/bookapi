const client = require("../db")
const createJournal = async(req, res)=>{
    console.log((req.body))
    try{
        const {journal} = req.body;
        if(!journal.main_title || !journal.author){
            throw Error("Send journal in request body");
        }
        client.query("INSERT INTO public.journal(publication_title, print_identifier, online_identifier, date_first_issue_online, title_url, title_id, coverage_depth, publisher_name, publication_type, subject) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)",[journal.publication_title, journal.print_identifier, journal.online_identifier, journal.date_first_issue_online, journal.title_url, journal.title_id, journal.coverage_depth, journal.publisher_name, journal.publication_type, journal.subject],
        (err,data)=>{
            res.status(201).json({
                error: null,
                message: "created new journal",
            });
        })
    }
    catch(error){
        res.status(500).json({
            error: error.message,
            message: "Failed to create new journal"
        })
    }
}
const getJournal = (req,res)=>{
    try{
        client.query("select * from journal", 
        (err, data)=>{
            if(err) throw err;
            res.status(200).json({
                error:null,
                journal:data.rows
            })
        })
    }
    catch(error){
        res.status(500).json({
            error:error.message,
            message: "Failed to create new journal"
        })
    }
}
const getJournalById = (req,res)=>{
    try{
        const {id} = req.params;
        client.query("select * from journal where jid=$id",[id],
        (err,data)=>{
            if(err) throw err;
            res.status(200).json({
                error:null,
                journal: data.rows[0]
            })
        })
    }
    catch(error){
        res.status(500).json({
            error:error.message,
            message: "Failed to create new journal"
        })
    }
}
const updateJounralById = (req, res)=>{
    try{
        const {id} = req.params;
        const {journal} = req.body;
        console.log(journal);
        console.log(id);
        client.query('update public.journal set publication_title=$1, print_identifier=$2, online_identifier=$3, date_first_issue_online=$4, title_url=$5, title_id=$6, coverage_depth=$7, publisher_name=$8, publication_type=$9, subject=$10',[journal.publication_title, journal.print_identifier, journal.online_identifier, journal.date_first_issue_online, journal.title_url, journal.title_id, journal.coverage_depth, journal.publisher_name, journal.publication_type, journal.subject],
        (err,data)=>{
            if(err) throw err;
            res.status(201).json({
                err:null,
                message: "succesfully updated the journal name"
            })
        });
    }
    catch(err){
        res.status(500).json({
            err:err.message,
            message:"failed to update"
        })
    }
}
const deleteJournalById = (req,res)=>{
    try{
        const {id} = req.params;
        client.query('delete from journal where jid=$1',[id], 
        (err, data)=>{
            if(err) throw err;
            res.status(201).json({
                err:null,
                message: "successfully deleted the journal"
            })
        })
    }
}

module.exports = {getJournal, createJournal, getJournalById, updateJournalById, deleteJournalByID};