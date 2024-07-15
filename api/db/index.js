const sql = require('mssql/msnodesqlv8');
const camelCaseDeep = require('camelcase-object-deep');

const config = {
    database: 'HW0605',
    server: '.\\sqlexpress',
    driver: 'msnodesqlv8',
    options: {
        trustServerCertificate: true,
        trustedConnection: true
    }
}

const addPerson = async person => {
    await sql.connect(config);

    const { name, email } = person;
    await sql.query`INSERT INTO People (Name, Email) VALUES(${name}, ${email})`;

    await sql.close();
}

const getPeople = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT * FROM People`;
    await sql.close();

    return recordset;
}

const getBills = async () => {
    await sql.connect(config);
    const { recordset } = await sql.query`SELECT b.Id, b.Amount, b.Date, COUNT(pb.BillId) as 'participantCount'
                                            FROM Bills b
                                            LEFT JOIN PeopleBills pb
                                            ON pb.BillId = b.Id
                                            GROUP BY b.Id, b.Amount, b.Date`;
    await sql.close();
    return recordset;
}

const getWithPeople = async id => {
    await sql.connect(config);
    let { recordset: bill } = await sql.query`SELECT * FROM Bills WHERE Id = ${id}`;

    let { recordset: people } = await sql.query`SELECT p.*
                                                FROM People p
                                                LEFT JOIN PeopleBills pb
                                                ON pb.PersonId = p.Id
                                                WHERE BillId = ${id}`;
    bill = camelCaseDeep(bill[0]);
    people = camelCaseDeep(people);
    await sql.close();
    return {
        amount: bill.amount,
        date: bill.date,
        people: people
    };
}

    const addBill = async bill => {
        await sql.connect(config);

        const { recordset } = await sql.query`INSERT INTO Bills (Amount, Date) VALUES(${bill.amount}, ${new Date()}) 
                                          SELECT SCOPE_IDENTITY() as 'id'`;
        const billId = recordset[0].id;
        for (let participantId of bill.participantIds) {
            await sql.query`INSERT INTO PeopleBills (PersonId, BillId) VALUES (${participantId}, ${billId})`;
        }
        await sql.close();
    }


module.exports = { addPerson, getPeople, getBills, addBill, getWithPeople };
