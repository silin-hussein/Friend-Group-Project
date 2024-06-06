package htl.leonding.bhitm.friendgroup.feature.chat;

import htl.leonding.bhitm.friendgroup.feature.friend.FriendRepository;
import htl.leonding.bhitm.friendgroup.feature.chat.message.Message;
import htl.leonding.bhitm.friendgroup.feature.chat.message.MessageRepository;
import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/chats")
@Produces(MediaType.APPLICATION_JSON)
public class ChatResource {
    @Inject
    ChatRepository chatRepository;

    @Inject
    MessageRepository messageRepository;

    @Inject
    FriendRepository friendRepository;

    @GET
    public List<Chat> all() {
        return chatRepository.listAll();
    }

    @Path("/{id}")
    @GET
    public Chat getById(@PathParam("id") Long id) {
        return chatRepository.findById(id);
    }

    @Transactional
    @POST
    public Response add(Chat chat) {
        chatRepository.persist(chat);

        return Response.ok().build();
    }

    @Path("/{id}/messages")
    @GET
    public List<Message> getMessages(@PathParam("id") Long id) {
        return chatRepository.findById(id).getMessages();
    }

    @Transactional
    @Path("/{id}/messages")
    @POST
    public Response addMessage(@PathParam("id") Long id, Message message) {
        var chat = chatRepository.findById(id);
        chat.getMessages().add(message);
        chatRepository.persistAndFlush(chat);

        return Response.ok().build();
    }

    @Transactional
    @Path("/{id}/messages")
    @DELETE
    public Response removeMessage(@PathParam("id") Long id, Message message) {
        var chat = chatRepository.findById(id);
        chat.removeMessage(message);
        chatRepository.persistAndFlush(chat);

        return Response.ok().build();
    }
}