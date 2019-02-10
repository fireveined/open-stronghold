import { Service } from 'typedi';
@Service()
export class RandomGenerator {

    public getDouble() {
        return Math.random();
    }

    public get(min: number, max: number) {
        return Math.floor(this.getDouble() * (max - min + 1) + min);
    }
}