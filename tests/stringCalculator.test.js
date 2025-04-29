import { describe, it, expect } from 'vitest';
import { add } from '../src/stringCalculator';

describe('add', () => {
  it('retourne 0 pour une chaîne vide', () => {
    expect(add("")).toBe(0);
  });

  it('retourne le nombre si un seul nombre est fourni', () => {
    expect(add("1")).toBe(1);
  });

  it('retourne la somme de deux nombres séparés par une virgule', () => {
    expect(add("1,2")).toBe(3);
  });

  it('retourne la somme de plusieurs nombres séparés par une virgule', () => {
    expect(add("1,2,3")).toBe(6);
    expect(add("4,5,6,7")).toBe(22);
  });

  it('retourne la somme en acceptant le retour à la ligne comme séparateur', () => {
    expect(add("1\n2,3")).toBe(6);
  });

  it('lance une erreur pour l\'entrée incorrecte "1,\\n"', () => {
    expect(() => add("1,\n")).toThrow();
  });

  it('retourne la somme avec un séparateur personnalisé', () => {
    expect(add("//;\n1;2")).toBe(3);
  });

  it('lance une exception si un nombre négatif est passé', () => {
    expect(() => add("1,-2,3")).toThrow('Negatives not allowed. [-2]');
  });

  it('ignore les nombres strictement supérieurs à 1000', () => {
    expect(add("1\n2,1002")).toBe(3);
  });

  it('retourne la somme avec plusieurs séparateurs personnalisés', () => {
    expect(add("//[*][%]\n1*2%3")).toBe(6);
  });
});
