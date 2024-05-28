package htl.leonding.bhitm.friendgroup.feature.Message;

import jakarta.inject.Inject;
import jakarta.transaction.Transactional;
import jakarta.ws.rs.*;
import jakarta.ws.rs.core.MediaType;
import jakarta.ws.rs.core.Response;

import java.util.List;

@Path("/messages")
@Produces(MediaType.APPLICATION_JSON)
public class MessageResource {
    @Inject
    MessageRepository messageRepository;

    @GET
    public List<Message> all() {
        return messageRepository.listAll();
    }

    @Path("/{id}")
    @GET
    public Message getById(@PathParam("id") Long id) {
        return messageRepository.findById(id);
    }

    @Transactional
    @POST
    public Response add(Message message) {
        messageRepository.persist(message);

        return Response.ok().build();
    }
}