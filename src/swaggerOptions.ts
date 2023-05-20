export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "propTech API",
      version: "1.0.0",
      description: "A simple API for a real state company",
    },
    servers: [
      {
        url: "https://api-proptech.up.railway.app/",
        description: "Local server for development",
      },
    ],
  },
  apis: ["./routes/index.ts", "./routes/brokers/broker.ts"],
};
