/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

import entities.Field;
import entities.Player;
import entities.Wheel;
import java.util.ArrayList;

/**
 *
 * @author Tweny
 */
public class WheelDTO {
    
    private int id;
    private ArrayList<FieldDTO> fields;
    private ArrayList<PlayerDTO> players;
    private CompanyDTO company;

    public WheelDTO() {
    }

    public WheelDTO(Wheel wheel) {
        this.id = wheel.getId();
        this.fields = wheel.getFields() == null ? null : makeFieldsDTOlist(wheel.getFields());
        this.players = wheel.getPlayers() == null ? null : makePlayersDTOlist(wheel.getPlayers());
        this.company = wheel.getCompany() == null ? null : new CompanyDTO(wheel.getCompany());
    }

    public WheelDTO(ArrayList<FieldDTO> fields, ArrayList<PlayerDTO> players, CompanyDTO company) {
        this.id = -1;
        this.fields = fields;
        this.players = players;
        this.company = company;
    }
    
    public WheelDTO(ArrayList<FieldDTO> fields, ArrayList<PlayerDTO> players) {
        this.id = -1;
        this.fields = fields;
        this.players = players;
        this.company = null;
    }
    
    public WheelDTO(ArrayList<FieldDTO> fields) {
        this.id = -1;
        this.fields = fields;
        this.players = new ArrayList<>();
    }
    
    
    private ArrayList<FieldDTO> makeFieldsDTOlist(ArrayList<Field> fields){
        ArrayList<FieldDTO> fieldDTOs = null;
        for(Field f : fields){
            fieldDTOs.add(new FieldDTO(f));
        }
        return fieldDTOs;
    }
    
    private ArrayList<PlayerDTO> makePlayersDTOlist(ArrayList<Player> players){
        ArrayList<PlayerDTO> playerDTOs = null;
        for(Player p : players){
            playerDTOs.add(new PlayerDTO(p));
        }
        return playerDTOs;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public ArrayList<FieldDTO> getFields() {
        return fields;
    }

    public void setFields(ArrayList<FieldDTO> fields) {
        this.fields = fields;
    }

    public ArrayList<PlayerDTO> getPlayers() {
        return players;
    }

    public void setPlayers(ArrayList<PlayerDTO> players) {
        this.players = players;
    }

    public CompanyDTO getCompany() {
        return company;
    }

    public void setCompany(CompanyDTO company) {
        this.company = company;
    }

    @Override
    public String toString() {
        return "WheelDTO{" + "id=" + id + ", fields=" + fields + ", players=" + players + '}';
    }
    
    
    
}
