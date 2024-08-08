const express = require("express");

function isCPFValid(cpf) {
    cpf = cpf.replace(/[^\d]/g, '');
    if (cpf.length !== 11) return false
    if (/^(\d)\1+$/.test(cpf)) return false
    const validateDigit = (cpf, factor) => {
        let total = 0;
        for (let i = 0; i < factor - 1; i++) {
            total += parseInt(cpf[i]) * (factor - i);
        }
        const remainder = (total * 10) % 11;
        return remainder === 10 ? 0 : remainder;
    };
    const digit1 = validateDigit(cpf, 10);
    const digit2 = validateDigit(cpf, 11);
    return digit1 === parseInt(cpf[9]) && digit2 === parseInt(cpf[10]);
}

const app = express();

app.use(express.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header("Access-Control-Allow-Headers", '*');
    next();
})

app.get("/customer-validator/document", (req, res) => {
    const document = req.query.document

    console.log('API CUSTOMER VALIDATOR FOI CHAMADA: ', document);

    const isValid = isCPFValid(document)
    return res.status(200).json( { isValid })
});

app.listen(3030, () => {
    console.log('customer validator is ready to use in port: 3030');   
});


