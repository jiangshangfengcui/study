import java.io.BufferedReader;
import java.io.InputStreamReader;

import java.util.Scanner;
import java.IOException;

public class loop {
	public static void main (String[] args) {
		int n0 = 8;
		int i;
		int sum = 0;
		for(i=0, i<10; i++) {
			sum += n0 * Math.pow(10, i) + sum;
		}
		System.out.println("sum:" + sum);
	}
}