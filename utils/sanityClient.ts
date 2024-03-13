import { createClient } from "next-sanity";

export const client = createClient({
    projectId: 'jxy63tlf',
    dataset: 'production',
    apiVersion: "2022-03-25",
    useCdn: false,
    token: "skQvdap9IpfdLlhlFvuaq8CKZkhvVENKQPDec5Q7yv3S0H1tMBcue7yH49nXrDm89Tz0EnlGxT3Sgy7xOn5KAziXGZ1uTC74Q0SJzYeSXptwfruUZXbLF3zL4LR62NMe4Zl1txZrRDubvYFy0jq1Rj4lCrly9DLR784XngOWT3MgqqaOQN8G"
})