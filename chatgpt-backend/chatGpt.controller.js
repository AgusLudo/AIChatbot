const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config();

const askToChatGpt = async function (req, res) {
  /**
   * 1. Create/configure OpenAI Instance
   */
  const openAIInstance = await _createOpenAIInstance();

  /**
   * 2. Let's talk to chatGPT
   */
  await openAIInstance
    .createCompletion({
      model: "text-davinci-003",
      prompt: req.body.message,
      temperature: 0,
      max_tokens: 500,
    })
    .then((response) => {
      const repliedMessage = response.data.choices[0].text;
      res.send({ from: "chatGpt", data: repliedMessage });
    })
    .catch((error) => {
      // Report error
      console.log("Error ", error);
    });
};

const _createOpenAIInstance = async () => {
  const conf = await new Configuration({
    organization: "org-OP5JXiVxZNVTStge2YzMXA6N",
    apiKey: process.env.CHATGPT_TOKEN,
    
  });
  console.log("apikeyfunc");
  return await new OpenAIApi(conf);
};

module.exports = {
  askToChatGpt,
};