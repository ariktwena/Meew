/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package dto;

import entities.Field;
import entities.Spin;
import java.util.ArrayList;

/**
 *
 * @author Tweny
 */
public class SpinDTOsmall {
    private int id;
    private String resultName;
    private int resultValue;
    private PlayerDTO player;

    public SpinDTOsmall() {
    }

    public SpinDTOsmall(Spin spin) {
        this.id = spin.getId();
        this.resultName = spin.getResultName();
        this.resultValue = spin.getResultValue();
        this.player = player == null ? null : new PlayerDTO(spin.getPlayer());
    }
    
    public SpinDTOsmall(int fieldNumbers, PlayerDTO player) {
        this.id = -1;
        this.resultName = "";
        this.resultValue = -1;
        this.player = player;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getResultName() {
        return resultName;
    }

    public void setResultName(String resultName) {
        this.resultName = resultName;
    }

    public int getResultValue() {
        return resultValue;
    }

    public void setResultValue(int resultValue) {
        this.resultValue = resultValue;
    }

    public PlayerDTO getPlayer() {
        return player;
    }

    public void setPlayer(PlayerDTO player) {
        this.player = player;
    }

    @Override
    public String toString() {
        return "SpinDTOsmall{" + "id=" + id + ", resultName=" + resultName + ", resultValue=" + resultValue + ", player=" + player + '}';
    }
    
    
}
