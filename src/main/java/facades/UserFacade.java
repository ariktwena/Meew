package facades;

import dto.UserDTO;
import entities.Role;
import entities.User;
import javax.persistence.EntityManager;
import javax.persistence.EntityManagerFactory;
import javax.persistence.Query;
import security.errorhandling.AuthenticationException;

/**
 * @author lam@cphbusiness.dk
 */
public class UserFacade {

    private static EntityManagerFactory emf;
    private static UserFacade instance;

    private UserFacade() {
    }

    /**
     *
     * @param _emf
     * @return the instance of this facade.
     */
    public static UserFacade getUserFacade(EntityManagerFactory _emf) {
        if (instance == null) {
            emf = _emf;
            instance = new UserFacade();
        }
        return instance;
    }

    public User getVeryfiedUser(String username, String password) throws AuthenticationException {
        EntityManager em = emf.createEntityManager();
        User user;
        try {
            user = em.find(User.class, username);
            if (user == null || !user.verifyPassword(password)) {
                throw new AuthenticationException("Invalid user name or password");
            }
        } finally {
            em.close();
        }
        return user;
    }

    
    public UserDTO createUser(String username, String password) throws AuthenticationException {
        EntityManager em = emf.createEntityManager();
        User newUser = new User(username, password);
        System.out.println(newUser);
        Role role;
        try {
            em.getTransaction().begin();
            em.persist(newUser);
            role = em.find(Role.class, "user");
            newUser.addRole(role);
            em.merge(newUser);
             em.getTransaction().commit();
        } finally {
            em.close();
        }
        return new UserDTO(newUser);
    }
}
