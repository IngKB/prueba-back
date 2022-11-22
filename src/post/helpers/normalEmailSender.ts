import { EmailSenderStrategy } from "./emailSenderStrategy";
import { MailService } from "@sendgrid/mail";
import { SendgridService } from "src/utils/sendgrid.service";
import { Post } from "../models/post.schema";
import { UserService } from "src/user/user.service";

export class NormalEmailSender implements EmailSenderStrategy {

    private post: Post;
    constructor(post: Post,
        private readonly sendgridService: SendgridService,
        private readonly userService: UserService) {
        this.post = post;
    }
    async execute() {

        let subscribers = this.userService.findSubs();
        let users = this.userService.findAll();

        users.forEach(async (user) => {
            try {
                let tags = "";
                this.post.tags.forEach(tag => {
                    tags += `<li style="padding:4px;background-color:#E3FDEE;border-radius:2px;display:inline-block;">${tag}</li>`;
                });
                
                const mail = {
                    to: `${user.email}`,
                    subject: 'Se ha creado un nuevo post',
                    from: 'karlos5566@hotmail.com',
                    text: `${this.post.title}`,
                    html: `<h1>${this.post.title}</h1>
                <ul>
                ${tags}
                </ul><p margin-top:4px>${this.post.text}</p>`
                };
                await this.sendgridService.send(mail)
            } catch (error) {
                console.log("Error al enviar correo");
            }

        });

        subscribers.forEach(async (user) => {
            try {
                let tags = "";
                this.post.tags.forEach(tag => {
                    tags += `<li style="padding:4px;background-color:#E3FDEE;border-radius:2px;display:inline-block;">${tag}</li>`;
                });

                const mail = {
                    to: `${user.email}`,
                    subject: 'Se ha creado un nuevo post',
                    from: 'karlos5566@hotmail.com',
                    text: `<h3>Revisa el nuevo post: ${this.post.title}</h3>`,
                    html: `<h3>Revisa el nuevo post: ${this.post.title}</h3>`
                };
                await this.sendgridService.send(mail)
            }
            catch (error) {
                console.log("Error al enviar correo");
            }
        });

    }
}