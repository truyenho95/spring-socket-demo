package com.truyenho.springsocketdemo.controller;

import com.truyenho.springsocketdemo.model.Emotion;
import com.truyenho.springsocketdemo.model.Status;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class WebController {

    @MessageMapping("/hello")
    @SendTo("/topic/hi")
    public Status status(Emotion emotion) throws Exception {
        return new Status(emotion.getEmotion());
    }
}
