/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

import entities.Player;

/**
 *
 * @author Tweny
 */
public class PlayerDTO {
    
    private int id;
    private String playerName;

    public PlayerDTO() {
    }

    public PlayerDTO(Player player) {
        this.id = player.getId();
        this.playerName = player.getPlayerName();
    }

    public PlayerDTO(String playerName) {
        this.id = -1;
        this.playerName = playerName;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getPlayerName() {
        return playerName;
    }

    public void setPlayerName(String playerName) {
        this.playerName = playerName;
    }

    @Override
    public String toString() {
        return "PlayerDTO{" + "id=" + id + ", playerName=" + playerName + '}';
    }
     
    
}
