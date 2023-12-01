import ky from "ky";

export const api = ky.create({
    prefixUrl: "https://c-voice-api.aona.in.th/"
})