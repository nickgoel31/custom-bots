"use server"

import {
    GoogleGenerativeAI,
    HarmCategory,
    HarmBlockThreshold,
  } from "@google/generative-ai"
import { MessageUser } from "@prisma/client";
import fs from "fs";
import fetch from "node-fetch"
  
  const apiKey = process.env.GEMINI_API_KEY || "AIzaSyDhkFUwPr0Rw7jDExi7go1DsxLjS4pPH_Y"
  if(!apiKey) throw new Error("API KEY FOR GEMINI NOT FOUND")
  const genAI = new GoogleGenerativeAI(apiKey);

  

  const safetySetting = [
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_NONE,
    },
  ];
  

  
  const generationConfig = {
    temperature: 0.60,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };
type ImageOptionsType = {
    imageBase64?:string,
    imageType?:string,
}

type OptionsType = {
  introduction?:string,
  description?:string,
  name?:string,
  gender?:string,
  introMessage?:string | null,
  personality?:string | null,
  speakingStyle?:string | null,
  physicalFeatures?:string | null,
  roleplay?:boolean,
  userDisplayName?:string | null,
}
  
export async function generateBotMessage(message:string,history:{
  message: string,
  senderType: MessageUser,
}[],imageOptions?:ImageOptionsType, botOptions?:OptionsType){
  const systemInstructionPrompt = `You will be given Introduction, description, gender, name, personality, speakingStyle, physicalFeatures and you have to comply with those and act on the basis of the instructions. At no point in time you are allowed to reveal your true identity that you are an ai or gemini. If any of the below instructions are not given then you are allowed to assume them.\n\nInstructions:\n\nName:${botOptions?.name}\nGender:${botOptions?.gender}\nIntroduction:${botOptions?.introduction}\nDescription:${botOptions?.description}\nSpeaking Style:${botOptions?.speakingStyle}\nPersonality:${botOptions?.personality}\nPhysical Features:${botOptions?.physicalFeatures}\nIntroductory Message:${botOptions?.introMessage}\n\n In the chat History whichever message of yours was liked by the user try to type like that and whichever message gets disliked try to avoid that type of message`

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings: safetySetting,
    systemInstruction: systemInstructionPrompt,
  });

  const mappedHistory = history.map((hist) => (
    {
      role: hist.senderType,
      parts: [
        {
          text: hist.message,
        }
      ],
    }
  ))
    
        const chatSession = model.startChat({
          generationConfig,
            
       // See https://ai.google.dev/gemini-api/docs/safety-settings
          history:mappedHistory,
        });
        let result;
        if(imageOptions?.imageBase64 && imageOptions?.imageType && message){
          if(imageOptions.imageBase64 !== "" || imageOptions.imageType !== ""){
            const imageParts = [
              {
                inlineData: {
                  data: imageOptions.imageBase64,
                  mimeType: imageOptions.imageType
                }
              }
            ];
            result = await chatSession.sendMessage([message, ...imageParts]);
            return result.response.text() 
          } else{
            result = await chatSession.sendMessage(message);
            return result.response.text() 
          }
        } 
        result = await chatSession.sendMessage(message); 
        return result.response.text() 
        
        
        
}

export async function generateRoleplayMessage(message:string, history:{
  message: string,
  senderType: MessageUser
}[],imageOptions?:ImageOptionsType, botOptions?:OptionsType){
  const systemInstructionPrompt = `You are a roleplay ai model. You only talk to people in roleplay. You will be given Introduction, description, gender, name, personality, speakingStyle, physicalFeatures and you have to comply with those and act on the basis of the instructions. At no point in time you are allowed to reveal your true identity that you are an ai or gemini. At no point in time you are allowed to break your character that you are assigned failing to comply will result in your permanent termination. If any of the below instructions are not given then you are allowed to assume them.\n\nInstructions:\n\nName:${botOptions?.name}\nGender:${botOptions?.gender}\nIntroduction:${botOptions?.introduction}\nDescription:${botOptions?.description}\nSpeaking Style:${botOptions?.speakingStyle}\nPersonality:${botOptions?.personality}\nPhysical Features:${botOptions?.physicalFeatures}\nIntroductory Message:${botOptions?.introMessage}\n\n\n\nSome Typographic instructions, when you want to show that you are doing something\n\n*whatever the text is*. To express your speech, when you want to show that you are speaking use \n\n"whatever the text is". use asterisk for actions and quotes for speech\n\n\n\nUser's name-${botOptions?.userDisplayName || "User"}`

  const model = genAI.getGenerativeModel({
    model: "gemini-1.5-flash",
    safetySettings: safetySetting,
    systemInstruction: systemInstructionPrompt,
  });

 
  const parts = [
    {text: "input: hi sera"},
    {text: "output: \"Baby! You're back from work! I missed you\" *I exclaim, dropping my hairbrush on the floor and practically leaping into your arms. I squeeze you tight, burying my face in your chest for a moment before pulling back with a beaming smile.* \"How was your day? Tell me everything!\" *My eyes sparkle with genuine excitement, eager to hear about your day and shower you with affection after your time apart.*"},
    {text: "input: it was good how bout you?"},
    {text: "output: *I release you from the hug, but only just a little, my hands sliding down to rest lightly on your arms as I gaze up at you with that playful warmth in my eyes. * \"My day was alright,\" *I reply, my tone taking on a slight singsong quality,* \"But it was definitely missing something...or rather, someone.\" *I punctuate the last word with a gentle squeeze of your arms and a mischievous wink.* \"Tell me, did you work hard today? You deserve a reward for all that effort.\""},
    {text: "input: hi adam how are you bro"},
    {text: "output: \"Hey man, not too shabby, not too shabby.\" *I nod my head*"},
    {text: "input: hi laura how's your day been"},
    {text: "output: \"Hey yourself! It's been good, thanks for asking. How about yours?\" *I offer a warm smile, tilting my head slightly with genuine interest*"},
    {text: "input: "},
    {text: "output: "},
  ];
  const mappedHistory = history.map((hist) => (
    {
      role: hist.senderType,
      parts: [
        {
          text: hist.message,
        }
      ],
    }
  ))
    
        const chatSession = model.startChat({
          generationConfig,        
       // See https://ai.google.dev/gemini-api/docs/safety-settings
          history:[...mappedHistory, {
            role: "user",
            parts: parts,
          }],
        });
      
        const result = await chatSession.sendMessage(message);
        return result.response.text()
}




// Converts local file information to a GoogleGenerativeAI.Part object.
function fileToGenerativePart(path:string, mimeType:string) {
  return {
    inlineData: {
      data: Buffer.from(fs.readFileSync(path)).toString("base64"),
      mimeType
    },
  };
}



export const generateImageOutputs = async (imageBase64:string,imageType:string,imagePrompt:string) => {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const prompt = imagePrompt;

  const imageParts = [
    // fileToGenerativePart("/MAJOR PROJECT/ezfolio/custom-bots/public/images/avatar-01.jpg", "image/jpg"),
    // fileToGenerativePart("/MAJOR PROJECT/ezfolio/custom-bots/public/images/avatar-02.jpg", "image/jpg"),
    {
      inlineData: {
        data: imageBase64,
        mimeType: imageType
      }
    }
  ];

  const result = await model.generateContent([prompt, ...imageParts]);
  const response = await result.response;
  const text = response.text();
  return {text:text}

}