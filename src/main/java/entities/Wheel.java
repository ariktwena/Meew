/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package entities;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;
import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.NamedQueries;
import javax.persistence.NamedQuery;
import javax.persistence.OneToMany;
import javax.persistence.Table;

/**
 *
 * @author Tweny
 */
@Entity
@Table(name = "wheel")
@NamedQueries({
    @NamedQuery(name = "Wheel.deleteAllRows", query = "DELETE from Wheel"),})
public class Wheel implements Serializable {

    private static final long serialVersionUID = 1L;
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;
    
    //***************One to Many****************
    @OneToMany(mappedBy = "wheel", cascade = {CascadeType.ALL}, fetch = FetchType.EAGER) 
    private ArrayList<Field> fields;

    public void addField(Field field) {
        if (field != null) {
            field.setWheel(this);
            this.fields.add(field);
        }
    }

    public ArrayList<Field> getFields() {
        return fields;
    }
    //*****************************************
    
    //***************Many to Many****************
    @ManyToMany(mappedBy = "wheels", cascade = {CascadeType.ALL}, fetch = FetchType.EAGER) 
    private ArrayList<Player> players;

    public void addPlayer(Player player) {
        if(player != null){
            this.players.add(player);
            player.getWheels().add(this);
        }
    }
    
     public void removePlayer(Player player) {
        if(player != null){
            this.players.remove(player);
            player.getWheels().remove(this);
        }
    }
    
    public ArrayList<Player> getPlayers() {
        return players;
    }
    //*******************************************
    
    //***************Many to One****************
    @ManyToOne
    private Company company;

    public void setCompany(Company company) {
        this.company = company;
    }

    public Company getCompany() {
        return company;
    }
    //***************************************************************

    public Wheel() {
        this.fields = new ArrayList<>();
        this.players = new ArrayList<>();
        this.company = null;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

  
    
}
