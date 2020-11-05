require('dotenv').config();

const express = require('express');
const axios = require('axios');
const md5 = require('md5');
const router = express.Router();
const baseURL = `https://${process.env.MAILCHIMP_INSTANCE}.api.mailchimp.com/3.0`;

router
    .use(function timeLog (req, res, next) {
        console.log('Time: ', Date.now());
        next()
    })

router
    .route('/')
    .get(function (req, res) {
        res.render('index')
    })
    .post(function (req, res) {
        //code to handle...
        res.send('A project was added')
    })
    .put(function (req, res) {
        //code to handle...
        res.send('A project was added')
    })
    .delete(function (req, res) {
        //code to handle...
        res.send('A project was deleted')
    });

router
    .route('/contact')
    .get(function (req, res) {
        res.render('contact')
    });

router
    .route('/thanks')
    .post(async function (req, res) {
        try {
            const response = await axios.get(`${baseURL}/`, {
                headers: { Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`}
            });
            //console.log(response);

            const audienceLists = await axios.get(`${baseURL}/lists/`, {
                headers: { Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`}
            });
            //console.log(audienceLists.data.lists);

            const mergeFields = await axios.get(`${baseURL}/lists/${process.env.AUDIENCE_ID}/merge-fields`, {
                headers: { Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`}
            });
            //console.log(mergeFields.data);

            // let email = req.body.email;
            // const subscriberHash = md5(email);
            // const subscriberData = await axios.get(`${baseURL}/lists/${process.env.AUDIENCE_ID}/members/${subscriberHash}`, {
            //     headers: { Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`}
            // });
            // console.log(subscriberData);

            const contact = { 
                email_address: req.body.email, 
                status_if_new: "subscribed",
                merge_fields: { 
                    FNAME: req.body.firstName,
                    LNAME: req.body.lastName 
                },        
            }
            const subscriberHash = md5(contact.email_address);
            const result = await axios.put(`${baseURL}/lists/${process.env.AUDIENCE_ID}/members/${subscriberHash}`, {
                email_address: contact.email_address, 
                status_if_new: contact.status_if_new,
                merge_fields: {
                    FNAME: contact.merge_fields.FNAME,
                    LNAME: contact.merge_fields.LNAME
                }
            }, {
                headers: { Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`}
            });
            //console.log(result);
        }
        catch (error) {console.log(error)}
        //if (response.body.statusText = "OK") {
            res.render('thanks', { contact: req.body})
        // } else {
        //     res.send('Error: your email address could not be entered.')
        // }
    });

module.exports = router
