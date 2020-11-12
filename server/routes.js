require('dotenv').config();

const express = require('express');
//const axios = require('axios');
//const md5 = require('md5');
const router = express.Router();
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

//const baseURL = `https://${process.env.MAILCHIMP_INSTANCE}.api.mailchimp.com/3.0`;

router
    .use(function timeLog (req, res, next) {
        console.log('Time: ', Date.now());
        next()
    })

router
    .route('/')
    .get(function (req, res) {
        var projects = [
            { 
                title: 'Movie Finder',
                image: '/assets/images/react200-movie-finder-1.png',
                heroku: 'https://llk-react200-movie-finder.herokuapp.com',
                github: 'https://github.com/laurelkelly/react200-movie-finder',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'Weather App',
                image: '/assets/images/react200-weather-app.png',
                heroku: 'https://llk-react200-weather-app.herokuapp.com',
                github: 'https://github.com/laurelkelly/react200-weather-app',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'Budget Tracker',
                image: '/assets/images/react200-budget-tracker.png',
                heroku: 'https://llk-react200-budget-tracker.herokuapp.com',
                github: 'https://github.com/laurelkelly/react200-budget-tracker',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'Word Associations Map',
                image: '/assets/images/react100-word-assoc-map.png',
                heroku: 'https://llk-react100-word-assoc-map.herokuapp.com',
                github: 'https://github.com/laurelkelly/react100-word-assoc-map',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'Very Simple ToDo App',
                image: '/assets/images/react100-vstda.png',
                heroku: 'https://llk-react100-vstda-hooks.herokuapp.com',
                github: 'https://github.com/laurelkelly/react100-vstda-hooks',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'San Diego Top Spots II',
                image: '/assets/images/react100-sd-top-spots.png',
                heroku: 'https://llk-react100-sd-top-spots.herokuapp.com',
                github: 'https://github.com/laurelkelly/react100-san-diego-top-spots',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'Change Calculator II',
                image: '/assets/images/react100-change-calc.png',
                heroku: 'https://llk-react100-change-calculator.herokuapp.com',
                github: 'https://github.com/laurelkelly/react100-change-calculator',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'Mortgage Calculator',
                image: '/assets/images/react100-mortgage-calc.png',
                heroku: 'https://llk-react100-mortgage-calc.herokuapp.com',
                github: 'https://github.com/laurelkelly/react100-mortgage-calculator',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'Tic-Tac-Toe Game',
                image: '/assets/images/react100-wkshop-tictactoe.png',
                heroku: 'https://llk-react100-wkshop-tictactoe.herokuapp.com',
                github: 'https://github.com/laurelkelly/react100-workshop',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'San Diego Top Spots I',
                image: '/assets/images/web102-san-diego-top-spots.png',
                heroku: 'https://llk-web102-san-diego-top-spots.herokuapp.com',
                github: 'https://github.com/laurelkelly/web102-san-diego-top-spots',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'Change Calculator I',
                image: '/assets/images/web102-change-calc.png',
                heroku: 'https://llk-web102-change-calculator.herokuapp.com',
                github: 'https://github.com/laurelkelly/web102-change-calculator',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            },
            { 
                title: 'Astro Weight Calculator',
                image: '/assets/images/web102-astroweight-calc.png',
                heroku: 'https://llk-web102-astroweight-calc.herokuapp.com',
                github: 'https://github.com/laurelkelly/web102-astro-weight-calculator',
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.'
            }
        ]
        res.render('index', {
            projects: projects
        });
    })
    /*
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
    */

router
    .route('/contact')
    .get(function (req, res) {
        res.render('contact')
    });

router
    .route('/thanks')
    .post(async function (req, res) {
        //console.log(req.body);
        let { firstName, lastName, email, message } = req.body;
        firstName = req.sanitize(firstName);
        lastName = req.sanitize(lastName);
        email = req.sanitize(email);
        message = req.sanitize(message);
        const msg = {
            to: 'laurellkelly@gmail.com',
            from: email,
            subject: `EJS Portfolio Contact Form Submission from ${firstName} ${lastName}`,
            text: message,
            html: message,
        };
        try {
            await sgMail.send(msg);
            res.render('thanks', { contact: req.body});
        } catch (error) {
            console.error(error);
            if (error.response) {
              console.error(error.response.body);
            }
            // req.flash('error', 'Sorry, something went wrong, please contact admin@website.com');
            // res.redirect('back');
            res.status(404).send('Error: Your message could not be sent at this time. Please check the email address and try again.')
        }

        //try {
            // ACCESS MAILCHIMP SUBSCRIBER DATA
            /*
            const response = await axios.get(`${baseURL}/`, {
                headers: { Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`}
            });
            console.log(response);

            const audienceLists = await axios.get(`${baseURL}/lists/`, {
                headers: { Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`}
            });
            console.log(audienceLists.data.lists);

            const mergeFields = await axios.get(`${baseURL}/lists/${process.env.AUDIENCE_ID}/merge-fields`, {
                headers: { Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`}
            });
            console.log(mergeFields.data);

            let email = req.body.email;
            const subscriberHash = md5(email);
            const subscriberData = await axios.get(`${baseURL}/lists/${process.env.AUDIENCE_ID}/members/${subscriberHash}`, {
                headers: { Authorization: `Bearer ${process.env.MAILCHIMP_API_KEY}`}
            });
            console.log(subscriberData);
            */

            // ADD/UPDATE MAILCHIMP AUDIENCE LIST MEMBER:
            /*
            const contact = { 
                email_address: req.body.email,
                message: req.body.message,
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
            console.log(result);

            if (result.statusText = "OK") {
                console.log('in the if statement')
                res.render('thanks', { contact: req.body});
            } else {
                res.status(404).send('Error: Your message could not be sent at this time. Please check the email address and try again.')
                res.redirect('back');
            }
        }
        catch (error) {
            console.log(error);
            res.status(404).send('Error: Your message could not be sent at this time. Please check the email address and try again.')
            res.redirect('back');
        }
        */
    });

module.exports = router
