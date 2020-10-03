import handlebars from 'handlebars';
import fs from 'fs';
import IMailTemplateProvider from '../models/IMailTemplateProvider';
import IParseMailTemplateDTO from '../dtos/IParseMailTemplateDTO';

class HandleBarsMailTemplateProvider implements IMailTemplateProvider {
  public async parse({
    file,
    variable,
  }: IParseMailTemplateDTO): Promise<string> {
    const templateFile = await fs.promises.readFile(file, { encoding: 'utf8' });
    const parseTempalte = handlebars.compile(templateFile);

    return parseTempalte(variable);
  }
}

export default HandleBarsMailTemplateProvider;
