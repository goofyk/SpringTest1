package ultra.java.spring.test1.controller;


import org.springframework.web.bind.annotation.*;
import ultra.java.spring.test1.exeption.NotFoundExeption;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("message")
public class MessageController {

    private static int counter = 5;

    private List<Map<String, String>> messages = new ArrayList<Map<String, String>>(){{
        add(new HashMap<String, String>(){{put("id", "1"); put("text", "test1");}});
        add(new HashMap<String, String>(){{put("id", "2"); put("text", "test2");}});
        add(new HashMap<String, String>(){{put("id", "3"); put("text", "test3");}});
        add(new HashMap<String, String>(){{put("id", "4"); put("text", "test4");}});
    }};


    @GetMapping
    public List<Map<String, String>> list(){
        return messages;
    }

    @GetMapping("{id}")
    public Map<String, String> getOne(@PathVariable String id){
        return getMessage(id);
    }

    private Map<String, String> getMessage(@PathVariable String id) {
        return messages.stream()
                .filter(message -> message.get("id").equals(id))
                .findFirst()
                .orElseThrow(NotFoundExeption::new);
    }

    @PostMapping
    public Map<String, String> insert(@RequestBody Map<String, String> message){
        message.put("id", String.valueOf(counter++));
        message.put("text", message.get("text"));
        messages.add(message);
        return  message;
    }

    @PutMapping("{id}")
    public Map<String, String> update(@PathVariable String id, @RequestBody Map<String, String> message){
        Map<String, String> messageFromDB = getMessage(id);
        messageFromDB.putAll(message);
        message.put("id", id);
        return  messageFromDB;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id){
        Map<String, String> message = getMessage(id);
        messages.remove(message);
    }

}
