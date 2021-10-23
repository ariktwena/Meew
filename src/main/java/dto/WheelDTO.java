/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

import entities.Field;
import entities.Player;
import entities.Spin;
import entities.Wheel;
import java.util.ArrayList;

/**
 *
 * @author Tweny
 */
public class WheelDTO {
    
    private int id;
    private String wheelName;
    private ArrayList<FieldDTO> fields;
    private ArrayList<PlayerDTO> players;
    private CompanyDTO company;
    private ArrayList<SpinDTOsmall> spins;

    public WheelDTO() {
    }

    public WheelDTO(Wheel wheel) {
        this.id = wheel.getId();
        this.wheelName = wheel.getWheelName();
        this.fields = wheel.getFields() == null ? null : makeFieldsDTOlist(wheel.getFields());
        this.players = wheel.getPlayers() == null ? null : makePlayersDTOlist(wheel.getPlayers());
        this.company = wheel.getCompany() == null ? null : new CompanyDTO(wheel.getCompany());
        this.spins = wheel.getSpins() == null ? null : makeSpinDTOsmallList(wheel.getSpins());
    }

    public WheelDTO(String wheelName, ArrayList<FieldDTO> fields, ArrayList<PlayerDTO> players, CompanyDTO company) {
        this.id = -1;
        this.wheelName = wheelName;
        this.fields = fields;
        this.players = players;
        this.company = company;
        this.spins = new ArrayList<SpinDTOsmall>();
    }
    
    public WheelDTO(String wheelName, ArrayList<FieldDTO> fields, ArrayList<PlayerDTO> players) {
        this.id = -1;
        this.wheelName = wheelName;
        this.fields = fields;
        this.players = players;
        this.company = null;
        this.spins = new ArrayList<SpinDTOsmall>();
    }
    
    public WheelDTO(String wheelName, ArrayList<FieldDTO> fields) {
        this.id = -1;
        this.wheelName = wheelName;
        this.fields = fields;
        this.players = new ArrayList<PlayerDTO>();
        this.spins = new ArrayList<SpinDTOsmall>();
    }
    
    public WheelDTO(String wheelName) {
        this.id = -1;
        this.wheelName = wheelName;
        this.fields = new ArrayList<FieldDTO>();;
        this.players = new ArrayList<PlayerDTO>();
        this.spins = new ArrayList<SpinDTOsmall>();
    }
    
    
    private ArrayList<FieldDTO> makeFieldsDTOlist(ArrayList<Field> fields){
        ArrayList<FieldDTO> fieldDTOs = new ArrayList<>();
        for(Field f : fields){
            fieldDTOs.add(new FieldDTO(f));
        }
        return fieldDTOs;
    }
    
    private ArrayList<PlayerDTO> makePlayersDTOlist(ArrayList<Player> players){
        ArrayList<PlayerDTO> playerDTOs = new ArrayList<>();
        for(Player p : players){
            playerDTOs.add(new PlayerDTO(p));
        }
        return playerDTOs;
    }
    
    private ArrayList<SpinDTOsmall> makeSpinDTOsmallList(ArrayList<Spin> spins){
        ArrayList<SpinDTOsmall> SpinDTOsmall = new ArrayList<>();
        for(Spin s : spins){
            SpinDTOsmall.add(new SpinDTOsmall(s));
        }
        return SpinDTOsmall;
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

    public ArrayList<SpinDTOsmall> getSpins() {
        return spins;
    }

    public void setSpins(ArrayList<SpinDTOsmall> spins) {
        this.spins = spins;
    }

    public String getWheelName() {
        return wheelName;
    }

    public void setWheelName(String wheelName) {
        this.wheelName = wheelName;
    }

    @Override
    public String toString() {
        return "WheelDTO{" + "id=" + id + ", wheelName=" + wheelName + ", fields=" + fields + ", players=" + players + ", company=" + company + ", spins=" + spins + '}';
    }
    
    
    
}
