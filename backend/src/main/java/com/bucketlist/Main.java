package com.bucketlist;

import com.bucketlist.chatGPT.ChatGPTService;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class Main {

	public static void main(String[] args) {
		ChatGPTService.main(args);
	}

}
