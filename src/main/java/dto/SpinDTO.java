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
public class SpinDTO {
    private int id;
    private int fieldNumbers;
    private double arcSize;
    private int top;
    private double offSet;
    private double rotate;
    private int resultNumber;
    private String resultName;
    private int resultValue;
    private PlayerDTO player;
    private WheelDTO wheel;

    public SpinDTO() {
    }

    public SpinDTO(Spin spin) {
        this.id = spin.getId();
        this.fieldNumbers = spin.getFieldNumbers();
        this.arcSize = spin.getArcSize();
        this.top = spin.getTop();
        this.offSet = spin.getOffSet();
        this.rotate = spin.getRotate();
        this.resultNumber = spin.getResultNumber();
        this.resultName = spin.getResultName();
        this.resultValue = spin.getResultValue();
        this.player = player == null ? null : new PlayerDTO(spin.getPlayer());
        this.wheel = wheel == null ? null : new WheelDTO(spin.getWheel());
    }
    
    public SpinDTO(int fieldNumbers, PlayerDTO player, WheelDTO wheelDTO) {
        this.id = -1;
        this.fieldNumbers = fieldNumbers;
        this.arcSize = (2 * Math.PI) / fieldNumbers;
        this.top = findTop(fieldNumbers);
        this.offSet = findOffSet(fieldNumbers, this.arcSize);
        this.rotate = Math.floor(Math.random() * 900) + 500;
        this.resultNumber = findResultNumber(this.arcSize, this.top, this.offSet, this.rotate, fieldNumbers);
        this.resultName = "";
        this.resultValue = -1;
        this.player = player;
        this.wheel = wheelDTO;
    }
    
    public SpinDTO(int fieldNumbers, PlayerDTO player) {
        this.id = -1;
        this.fieldNumbers = fieldNumbers;
        this.arcSize = (2 * Math.PI) / fieldNumbers;
        this.top = findTop(fieldNumbers);
        this.offSet = findOffSet(fieldNumbers, this.arcSize);
        this.rotate = Math.floor(Math.random() * 900) + 500;
        this.resultNumber = findResultNumber(this.arcSize, this.top, this.offSet, this.rotate, fieldNumbers);
        this.resultName = "";
        this.resultValue = -1;
        this.player = player;
        this.wheel = null;
    }
    
    public SpinDTO(PlayerDTO player) {
        this.id = -1;
        this.fieldNumbers = 0;
        this.arcSize = (2 * Math.PI) / fieldNumbers;
        this.top = findTop(fieldNumbers);
        this.offSet = findOffSet(fieldNumbers, this.arcSize);
        this.rotate = Math.floor(Math.random() * 900) + 500;
        this.resultNumber = findResultNumber(this.arcSize, this.top, this.offSet, this.rotate, fieldNumbers);
        this.resultName = "";
        this.resultValue = -1;
        this.player = player;
        this.wheel = null;
    }
    
      private int findTop(int fieldNumbers) {
        if (fieldNumbers == 9) {
            return 7;
        } else if (fieldNumbers == 8) {
            return 6;
        } else if (fieldNumbers <= 7 && fieldNumbers > 4) {
            return fieldNumbers - 1;
        } else if (fieldNumbers == 4) {
            return fieldNumbers - 1;
        } else {
            return fieldNumbers;
        }
    }

    private double findOffSet(int fieldNumbers, double arcSize) {
        if (fieldNumbers == 9) {
            return Math.PI / 2 - arcSize * 2;
        } else if (fieldNumbers == 8) {
            return 0;
        } else if (fieldNumbers <= 7 && fieldNumbers > 4) {
            return Math.PI / 2 - arcSize;
        } else if (fieldNumbers == 4) {
            return 0;
        } else {
            return Math.PI / 2;
        }
    }

    private int findResultNumber(double arcSize, int top, double offSet, double rotate, int fieldNumbers) {
        double netRotation = ((rotate % 360) * Math.PI) / 180;
        double travel = netRotation + offSet;
        int count = top + 1;

        while (travel > 0) {
            travel = travel - arcSize;
            count--;
        }

        int result;
        if (count >= 0) {
            result = count;
        } else {
            result = fieldNumbers + count;
        }

        return result;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getFieldNumbers() {
        return fieldNumbers;
    }

    public void setFieldNumbers(int fieldNumbers) {
        this.fieldNumbers = fieldNumbers;
    }

    public double getArcSize() {
        return arcSize;
    }

    public void setArcSize(int fieldNumbers) {
        this.arcSize = (2 * Math.PI) / fieldNumbers;
    }

    public int getTop() {
        return top;
    }

    public void setTop(int fieldNumbers) {
        this.top = findTop(fieldNumbers);
    }

    public double getOffSet() {
        return offSet;
    }

    public void setOffSet(int fieldNumbers) {
        this.offSet = findOffSet(fieldNumbers, this.arcSize);
    }

    public double getRotate() {
        return rotate;
    }

    public void setRotate() {
        this.rotate = Math.floor(Math.random() * 900) + 500;
    }

    public int getResultNumber() {
        return resultNumber;
    }

    public void setResultNumber(int fieldNumbers) {
        this.resultNumber = findResultNumber(this.arcSize, this.top, this.offSet, this.rotate, fieldNumbers);
    }

    public String getResultName() {
        return resultName;
    }

    public void setResultName(String resultName) {
        this.resultName = resultName;
    }
    
    public void setResultName(ArrayList<FieldDTO> fields) {
        this.resultName = fields.get(this.resultNumber).getPrizeName();
    }

    public int getResultValue() {
        return resultValue;
    }

    public void setResultValue(int resultValue) {
        this.resultValue = resultValue;
    }
    
    public void setResultValue(ArrayList<FieldDTO> fields) {
        this.resultValue = fields.get(this.resultNumber).getPrizeValue();
    }

    public PlayerDTO getPlayer() {
        return player;
    }

    public void setPlayer(PlayerDTO player) {
        this.player = player;
    }

    public WheelDTO getWheel() {
        return wheel;
    }

    public void setWheel(WheelDTO wheel) {
        this.wheel = wheel;
    }

    @Override
    public String toString() {
        return "SpinDTO{" + "id=" + id + ", fieldNumbers=" + fieldNumbers + ", arcSize=" + arcSize + ", top=" + top + ", offSet=" + offSet + ", rotate=" + rotate + ", resultNumber=" + resultNumber + ", resultName=" + resultName + ", resultValue=" + resultValue + ", player=" + player + ", wheel=" + wheel + '}';
    }

}
